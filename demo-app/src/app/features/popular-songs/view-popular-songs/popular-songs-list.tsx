import {useEffect} from "react";
import {AppDispatch, RootState} from "../../../core/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {GetPopularSongs} from "./presenter/getPopularSongs.thunk.ts";

export const PopularSongsList = () => {
    const { songs, loading, error } = useSelector((state: RootState) => state.popularSongs)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {dispatch(GetPopularSongs({maxNumber : 10}));}, [])

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