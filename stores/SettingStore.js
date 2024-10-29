/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import compareVersions from 'compare-versions';
import { action, computed, decorate, makeAutoObservable, makeObservable, observable } from 'mobx';
import { Platform } from 'react-native';

import Themes from '../themes';
/**
 * Data store for application settings
 */
export default class SettingStore {
	DEFAULT_ROTATION_LOCK_ENABLED = Platform.OS === 'ios' && !Platform.isPad;

	DEFAULT_SCREEN_LOCK_ENABLED = Platform.OS === 'ios' ? !!Platform.Version && compareVersions.compare(Platform.Version, '14', '<') : true;

	/**
	 * The id of the currently selected server
	 */
	@observable activeServer = 0

	/**
	 * Is device rotation lock enabled
	 */
	@observable isRotationLockEnabled = this.DEFAULT_ROTATION_LOCK_ENABLED

	/**
	 * Is screen lock active when media is playing
	 */
	@observable isScreenLockEnabled = this.DEFAULT_SCREEN_LOCK_ENABLED

	/**
	 * Are tab labels enabled
	 */
	@observable isTabLabelsEnabled = true

	/**
	 * The user selected theme value
	 */
	@observable themeId = 'dark'

	/**
	 * The system level appearance/theme value
	 */
	@observable systemThemeId

	/**
	 * Should the app use system level theme
	 */
	@observable isSystemThemeEnabled = false

	/**
	 * Is the native video player enabled
	 */
	@observable isNativeVideoPlayerEnabled = false

	/**
	 * Is fMP4 enabled for the native video player
	 */
	@observable isFmp4Enabled = false;

	/**
	 * EXPERIMENTAL: Is the native audio player enabled
	 */
	@observable isExperimentalNativeAudioPlayerEnabled = false

	/**
	 * EXPERIMENTAL: Is download support enabled
	 */
	@observable isExperimentalDownloadsEnabled = false;

	get theme() {
		const id = this.isSystemThemeEnabled && this.systemThemeId && this.systemThemeId !== 'no-preference' ? this.systemThemeId : this.themeId;
		return Themes[id] || Themes.dark;
	}

	reset() {
		this.activeServer = 0;
		this.isRotationLockEnabled = this.DEFAULT_ROTATION_LOCK_ENABLED;
		this.isScreenLockEnabled = this.DEFAULT_SCREEN_LOCK_ENABLED;
		this.isTabLabelsEnabled = true;
		this.themeId = 'dark';
		this.systemThemeId = null;
		this.isSystemThemeEnabled = false;
		this.isNativeVideoPlayerEnabled = false;
		this.isFmp4Enabled = false;

		this.isExperimentalNativeAudioPlayerEnabled = false;
		this.isExperimentalDownloadsEnabled = false;
	}
}