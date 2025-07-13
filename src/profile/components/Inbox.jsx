import { SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

function Inbox() {
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      try {
        // Sanitize the user ID - remove leading/trailing spaces and special characters
        const email = user.primaryEmailAddress?.emailAddress || "";
        const id = email
          .split("@")[0]
          .trim()
          .replace(/[^a-zA-Z0-9_]/g, "_");

        if (id) {
          console.log("Setting user ID for SendBird:", id);
          setUserId(id);
          setIsReady(true);
        } else {
          console.error("Could not determine valid user ID from email");
        }
      } catch (error) {
        console.error("Error setting user ID:", error);
      }
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return <div className="p-10 text-center">Loading user data...</div>;
  }

  if (!user) {
    return (
      <div className="p-10 text-center">Please sign in to access messages.</div>
    );
  }

  if (!isReady || !userId) {
    return (
      <div className="p-10 text-center">Preparing messaging interface...</div>
    );
  }

  return (
    <div className="h-full">
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 160px)",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <SendBirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName || userId}
          profileUrl={user?.imageUrl || ""}
          allowProfileEdit={true}
          stringSet={{
            CHANNEL_LIST__TITLE: "Conversations",
            CHANNEL__MESSAGE_INPUT__PLACEHOLDER: "Type your message here...",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="border-r border-gray-200">
              <GroupChannelList
                onChannelSelect={(channel) => {
                  if (channel?.url) {
                    console.log("Selected channel:", channel.url);
                    setChannelUrl(channel.url);
                  }
                }}
                channelListQueryParams={{ includeEmpty: true }}
                renderHeader={() => (
                  <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg">Messages</h2>
                  </div>
                )}
              />
            </div>
            <div className="md:col-span-2 h-full">
              {channelUrl ? (
                <GroupChannel channelUrl={channelUrl} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
}

export default Inbox;
