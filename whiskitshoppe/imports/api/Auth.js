import { app } from './Firebase';
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export default auth;