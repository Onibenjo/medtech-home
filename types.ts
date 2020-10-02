import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from "twilio-video";
declare module "twilio-video" {
  // import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from "twilio-video";
  interface LocalParticipant {
    setBandwidthProfile: (
      bandwidthProfile: VideoBandwidthProfileOptions
    ) => void;
    publishTrack(
      track: LocalTrack,
      options?: { priority: Track.Priority }
    ): Promise<LocalTrackPublication>;
  }

  interface VideoCodecSettings {
    simulcast?: boolean;
  }

  interface LocalVideoTrack {
    isSwitchedOff: undefined;
    setPriority: undefined;
  }

  interface RemoteVideoTrack {
    isSwitchedOff: boolean;
    setPriority: (priority: Track.Priority | null) => void;
  }

  interface VideoBandwidthProfileOptions {
    trackSwitchOffMode?: "predicted" | "detected" | "disabled";
  }
}

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }
}

export type Callback = (...args: any[]) => void;

export type ErrorCallback = (error: TwilioError) => void;

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;
