import { StateCreator, create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";

interface NativeState {
  isNative: boolean;
}

interface NativeStateAction {
  setIsNative: (isNative: boolean) => void;
}

export interface NativeStore extends NativeState, NativeStateAction {}

export type NativeStatePersist = (
  config: StateCreator<NativeStore>,
  options: PersistOptions<NativeState>
) => StateCreator<NativeStore>;

export const useIsRN = create<NativeStore>(
  (persist as NativeStatePersist)(
    (set) => ({
      isNative: false,
      setIsNative: (isNative) =>
        set((state) => ({ ...state, isNative: isNative })),
    }),
    { name: "nativeStore" }
  )
);
