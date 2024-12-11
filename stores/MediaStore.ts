/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { ticksToMs } from '../utils/Time';
import { create } from 'zustand';

type State = {
	/** The media type being played */
	type?: string,

	/** URI of the current media file */
	uri?: string,

	/** URI of the backdrop image of the current media item */
	backdropUri?: string,
	
	/** Current playback position (in ticks) */
	positionTicks: number,

	/** Has media playback finished */
	isFinished: boolean,

	/** Is the media in a local file (i.e. not streaming) */
	isLocalFile: boolean,
	
	/** Is the media currently playing */
	isPlaying: boolean,
	
	/** The player should toggle the play/pause state */
	shouldPlayPause: boolean,

	/** The player should stop playback */
	shouldStop: boolean,
}

type Actions = {
	set: (v: Partial<State>) => void,

	/** Current position in milliseconds */
	getPositionMillis: () => number,

	/** Resets the store to a default state */
	reset: () => void
}

export type MediaStore = State & Actions

const initialState: State = {
	type: null,
	uri: null,
	backdropUri: null,
	isFinished: false,
	isLocalFile: false,
	isPlaying: false,
	positionTicks: 0,
	shouldPlayPause: false,
	shouldStop: false
}

export const useMediaStore = create<State & Actions>()((_set, _get) => ({
	...initialState,
	set: (state) => { _set({...state} )},
	getPositionMillis: () => ticksToMs(_get().positionTicks),
	reset: () => {
		_set({ ...initialState })
	}
}))