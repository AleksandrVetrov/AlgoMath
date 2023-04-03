class Lib {

    static generateURL(length){
        let chars = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
        let  str = '';
        for (let i = 0; i < length; i++) {
            let  pos = Math.floor(Math.random() * chars.length);
            str += chars.substring(pos,pos+1);
        }
        return str;
    }

}

export default Lib;