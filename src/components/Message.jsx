import { auth } from "../firebase";

const Message = ({ data }) => {
  //* Eğer mesajı oturumu açık olan kullanıcı attıysa: sağ taraf
  if (auth.currentUser.uid === data.author.id) {
    return <div className="msg-user"> {data.text} </div>;
  }

  //* Eğer mesajı farklı bir kullanıcı attıysa: sol taraf
  return (
    <div className="msg-other">
      <div>
        <img src={data.author.photo} />
        <span> {data.author.name} </span>
      </div>
      <p className="msg-text"> {data.text} </p>
    </div>
  );
};

export default Message;
