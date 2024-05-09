import { create } from "zustand";

interface LikesState {
  likes: { [key: number]: number };
  setLikes: (likes: { [key: number]: number }) => void;
  updateLikes: (geonameId: number, liked: boolean) => void;
}

const useLikesStore = create<LikesState>((set) => ({
  likes: {},
  setLikes: (likes) => set({ likes }),
  updateLikes: (geonameId, liked) =>
    set((state) => ({
      likes: {
        ...state.likes,
        [geonameId]: liked ? 1 : 0,
      },
    })),
}));

export default useLikesStore;
