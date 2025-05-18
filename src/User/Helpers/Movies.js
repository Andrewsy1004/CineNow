

import axios from 'axios';


const host = import.meta.env.VITE_API_BASE_URL;



export const getSeats = async (token, dataBooking) => {
    try {

        const response = await axios.post(`${host}/movies/seats`, dataBooking, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error fetching seats:", error);
        return {
            status: false,
            message: "Error fetching seats"
        };
    }


}


export const createNewBooking = async ( token, CreateData ) => {
    try {

        const response = await axios.post(`${host}/movies/createSeats`, CreateData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        return {
            status: false,
            message: "Error creating booking"
        };
    }
}


export const GetBillUser = async ( token ) => {
    try {

        const response = await axios.get(`${host}/movies/BillUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            status: true,
            data: response.data
        };
        
    } catch (error) {
        console.error("Error fetching bill:", error);
        return {
            status: false,
            message: "Error fetching bill"
        };
    }

}


export const GetUserTickets = async ( token ) => {
    try {

        const response = await axios.get(`${host}/movies/TicketUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            status: true,
            data: response.data
        };
        
    } catch (error) {
        console.error("Error fetching bill:", error);
        return {
            status: false,
            message: "Error fetching bill"
        };
    }

}