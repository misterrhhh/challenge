import { useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io";
import { io, Socket } from "socket.io-client";
import { ExtendedDota2 } from "../interface/interface";

export const useSocket = () => {
	const [data, setData] = useState<ExtendedDota2 | null>(null);
	const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
	

    const SOCKET_SERVER_URL = `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

	useEffect(() => {
		
		const newSocket = io(SOCKET_SERVER_URL);
		setSocket(newSocket);

		newSocket.on('data', (incomingData) => {
			setData(incomingData);
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);

	return { data, socket };
};