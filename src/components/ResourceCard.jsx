function ResourceCard({title, subject, category, createdAt,author}) {

    return (
      <div className="card">
        <p>Title: {title}</p>
        <p>Subject: {subject}</p> 
        <p>Category: {category}</p>
        <p>Author: {author}</p>
        <p>Created_at: {createdAt}</p>
        <button>Open Resource</button>
      </div>

    )
  };
  export default ResourceCard;