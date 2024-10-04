interface UserProfileProps {
  params: {
    username: string;
  };
}

export default function UserProfile({ params }: { params: { username: string } }) {
  const { username } = params;

  if (!username) {
    return <p>Loading...</p>;
  }

  // Fetch user data based on username or use passed data

  return (
    <div>
      <h1>Profile of {username}</h1>
      {/* Render more user details here */}
    </div>
  );
}
