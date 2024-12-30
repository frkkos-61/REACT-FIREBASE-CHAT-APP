import { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Main from "../components/Main";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [isOpen, setIsopen] = useState(false);

  //*form gönderilince mesajı veritabanına kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();

    //*mesaj boş mu kontrol et
    if (text.trim() === "") return;

    //* mesajların gönderilecği koleksiyonun referansını al
    const messagesCol = collection(db, "Messages");

    //* referansı alınan koleksiyona belge oluştur
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    //* input'u temizle
    setText("");
  };
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.email}</p>
        <p> {room} </p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <Main room={room} />

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="Mesajınızı Yazınız"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
            }}
            open={isOpen}
          />

          <button className="emoji-btn" onClick={() => setIsopen(!isOpen)}>
            <span>🤣</span>
          </button>
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
