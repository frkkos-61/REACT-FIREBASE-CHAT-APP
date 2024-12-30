import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import Message from "./Message";

const Main = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const lastMessage = useRef();

  //* veritabanından bu odaya gönderilen mesajları al
  useEffect(() => {
    //* abone olunacak koleksiyonun referansını al
    const messagesCol = collection(db, "Messages");

    //* Sorgu ayarlarını yap
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    //*koleksiyondaki anlık güncellemelere abone ol
    const unsub = onSnapshot(q, (data) => {
      //*mesajların geçici olarak tutulacağı dizi
      const temp = [];

      //*docs dizisindeki  her bir dökümanın data() methodu ile datasına erişip geçici diziye aktardık
      data.docs.forEach((doc) => temp.push(doc.data()));

      //* state'i güncelle
      setMessages(temp);
    });

    //* Kullanıcı bu sayfadan ayrılınca koleksiyonu izlemeyi durdur(performans açısından da iyi bir hamle olacaktır)
    return () => unsub();
  }, []);

  //* İlk odaya girildiğinde ve her mesaj atıldığında en aşağı kaydır
  useEffect(() => {
    lastMessage.current.scrollIntoView();
  }, [messages]);

  return (
    <main>
      {messages.length < 1 ? (
        <div className="warn">
          <p>Sohbete İlk Mesajı Gönderin</p>
        </div>
      ) : (
        messages.map((i) => <Message key={i.id} data={i} />)
      )}

      <div ref={lastMessage} />
    </main>
  );
};

export default Main;
