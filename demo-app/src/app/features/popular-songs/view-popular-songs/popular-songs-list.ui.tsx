import {useEffect} from "react";
import {AppDispatch, RootState} from "../../../core/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {ViewPopularSongsThunk} from "./ViewPopularSongs.thunk.ts";

export const PopularSongsList = () => {
    const popularSongs = useSelector((state: RootState) => state.popularSongs)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {dispatch(ViewPopularSongsThunk({maxNumber : 2}));}, [])

    return (
        <div>
            <p>Loading: {popularSongs.IsPending ? 'true' : 'false'}</p>
            <p>Error: {popularSongs.Error?.message}</p>
            <ul>
                {popularSongs.Value
                    .filter((item) => item.status == 'Idle')
                    .map((item)=> item.object as Song)
                    .map((item) => <li key={item.id}>{item.title}</li>
                )}
            </ul>
        </div>
    )
};