import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../styles/components/NotificationComponent.css';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      console.error("Email no encontrado en el localStorage");
      return;
    }
    console.log("Correo electrónico recuperado:", email);

    const socket = new SockJS('http://localhost:8082/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe(`/user/${email}/topic/notifications`, (message) => {
          if (message.body) {
            setNotifications((prevNotifications) => [...prevNotifications, message.body]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error: ', error);
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [client]);

  return (
    <div className="notifications">
      <h2>Notificaciones</h2>
      <ul className="list-group">
        {notifications.map((notification, index) => (
          <li key={index} className="list-group-item">{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
