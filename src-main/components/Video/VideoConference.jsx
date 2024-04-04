import React, { useState, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoConference = () => {
  const [roomID, setRoomID] = useState('');
  const [joiningRoom, setJoiningRoom] = useState(false);

  useEffect(() => {
    if (joiningRoom) {
      const userID = Math.floor(Math.random() * 10000) + '';
      const userName = 'userName' + userID;
      const appID = 316561398;
      const serverSecret = 'b5e7c66b9c8d1c4190e9d29c5295d26f';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.querySelector('#root'),
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnMicrophoneWhenJoining: true,
        turnOnCameraWhenJoining: true,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        maxUsers: 50,
        layout: 'Sidebar',
        showLayoutButton: true,
      });
    }
  }, [joiningRoom, roomID]);

  const handleJoinRoom = () => {
    setJoiningRoom(true);
  };

  return (
    <div>
      <div>
        <label>Enter Room ID: </label>
        <input
          type="text"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div id="root" style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  );
};

export default VideoConference;