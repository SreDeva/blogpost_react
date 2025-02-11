import BlogList from './BlogList';
import useFetch from './usefetch';


const Home = () => {
    const {data: blogs, isPendinng, error} = useFetch('http://localhost:8000/blogs');


    return ( 
        <div className="home">
            { error && <div>{error}</div> }
            { isPendinng && <div>Loading...</div> }
            { blogs && <BlogList blogs={blogs}/> }
        </div>
     );
}
 
export default Home;