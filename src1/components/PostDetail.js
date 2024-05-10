import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { db } from '../firebase'; // Adjust the path based on your directory structure.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [imageURLs, setImageURLs] = useState([]); // State for storing image URLs
  const [videoURL, setVideoURL] = useState(null); // State for storing video URL

  useEffect(() => {
    // Fetch the post details based on the postId from the URL
    const fetchPostDetails = async () => {
      try {
        const postDoc = await getDoc(doc(db, 'posts', postId));

        if (postDoc.exists()) {
          // Post exists, retrieve the data
          const postData = postDoc.data();
          setPost(postData);

          // Check if the post has associated image URLs
          if (postData.imageURL) {
            setImageURLs(postData.imageURL);
          }

          // Check if the post has an associated video URL
          if (postData.videoURL) {
            setVideoURL(postData.videoURL);
          }
        } else {
          // Post does not exist, handle accordingly (e.g., show a message)
          console.log('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [db, postId]);

  // Function to generate Google Maps URL with directions
  const getGoogleMapsDirectionsURL = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="post-detail">
            {post ? (
              <>
                <h1>{post.name}'s Post</h1>
                <p>{post.content}</p>
                {/* Render images */}
                <div className="image-container">
                  {imageURLs.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Image ${index}`}
                      style={{ width: '50%' }} // Set the image width to 50%
                    />
                  ))}
                </div>
                {/* Render video */}
                {videoURL && (
                  <div className="video-container">
                    <video controls src={videoURL} alt="video" />
                  </div>
                )}
                {/* Display time, location, and username */}
                <p>Posted on: {post.time && post.time.toDate().toLocaleString()}</p>
                <p>
                  Location:{' '}
                  <a
                    href={getGoogleMapsDirectionsURL(post.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.location}
                  </a>
                </p>
                <p>Username: {post.name}</p>
                {/* Add other post details you want to display */}
              </>
            ) : (
              <p>Loading post details...</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostDetail;
