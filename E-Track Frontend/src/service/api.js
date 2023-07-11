import axios from '../components/axios'
export const handleSubmitSignup = async (name,contact,password) => {
    const data = await axios.post("/customer/signup", {
        name,
        contact,
        password
      });
      console.log(data);
        if(data.status === 201){
            localStorage.setItem("isAuthenticated", "true");
            // localStorage.setItem('user', data.data.name);
        }
}