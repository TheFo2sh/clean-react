import {useEffect} from "react";
import {AppDispatch, RootState} from "../../../core/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {ViewPopularSongsThunk} from "./ViewPopularSongs.thunk.ts";

export const PopularSongsList = () => {
    const { songs, loading, error } = useSelector((state: RootState) => state.popularSongs)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {dispatch(ViewPopularSongsThunk({maxNumber : 2}));}, [])

    return (
        <div>
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Error: {error}</p>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>{song.title}</li>
                ))}
            </ul>
        </div>
    )
};