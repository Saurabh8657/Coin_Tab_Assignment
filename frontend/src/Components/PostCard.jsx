
export default function PostCard({ item , currUser }) {
  return (
    <div style={{ width: "300px" }} className="border border-primary-subtle">
      <p><b>Name:</b> {currUser.name}</p>
      <p><b>Title:</b> {item.title}</p>
      <p><b>Body:</b> {item.body}</p>
      <p><b>Company:</b> {currUser.company}</p>
    </div>
  );
}
