import {toast} from 'react-toastify';

const useToast = (menssage, status = null) =>{
    if(!status){
        toast.success(menssage, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
        })
    }else if(status === "error"){
        toast.error(menssage, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
        })
    }
}

export default useToast