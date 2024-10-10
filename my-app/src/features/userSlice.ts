import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config'

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
}

// Define State Type
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Thunk to fetch users from Firebase
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
});

// Thunk to add a user to Firebase
export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser: { name: string; email: string }) => {
    const docRef = await addDoc(collection(db, 'users'), newUser);
    return { ...newUser, id: docRef.id };
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload as User[];
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch users';
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default userSlice.reducer;