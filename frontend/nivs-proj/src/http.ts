import axios from 'axios';
export async function updateLogin(pernr : string){
    try {
        const response = await axios.post('/login', {pernr : "8604191", pass : "1"})
        
       
        return {...response.data}
    } catch (e) {
        return {
                error: true,
                // error_message: e.message
            };
        }
};