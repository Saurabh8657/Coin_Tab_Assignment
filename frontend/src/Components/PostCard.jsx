
export default function PostCard({ item , currUser }) {
  return (
    <div style={{  width: "300px",
    backgroundColor: "rgba(13,110,253,0.2)",
    transition: "transform 0.3s ease-in-out" ,
    ':hover': {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "scale(1.05)"
    }}} className="border border-primary p-3 mb-3 rounded text-start px-4">
      <p><b className="text-primary">Name:</b> {currUser.name}</p>
      <p><b className="text-primary">Title:</b> {item.title}</p>
      <p><b className="text-primary">Body:</b> {item.body}</p>
      <p><b className="text-primary">Company:</b> {currUser.company}</p>
    </div>
  );
}

