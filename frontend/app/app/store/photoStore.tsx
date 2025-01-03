import {create} from 'zustand';

interface PhotoStore {
  photoUri: string | undefined;
  setPhotoUri: (uri: string) => void;
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  photoUri: undefined,
  setPhotoUri: (uri) => {
    console.log(`Setting photo uri to ${uri}`);
    return set({ photoUri: uri });
  }
}));