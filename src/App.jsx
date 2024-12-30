import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ChatPage from "./pages/ChatPage";

const App = () => {
  //* Kullanıcının yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState(false);

  //*hangi odaya girildiği state'i
  const [room, setRoom] = useState(null);

  //* Sayfa yenilendiğinde kullanıcı oturum bilgisini alır
  useEffect(() => {
    //*Kullanıcının oturum durumu her değiştiğinde güncel bilgileri alıp getirir
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user);
    });
  }, []);

  //*Yetkisi yoksa: login page'i ekrana bas
  if (!isAuth) return <LoginPage />;

  //*Yetkisi varsa: oda seçme sasyfasını ekrana bas
  return (
    <div className="container">
      {room ? (
        <ChatPage room={room} setRoom={setRoom} />
      ) : (
        <RoomPage setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
