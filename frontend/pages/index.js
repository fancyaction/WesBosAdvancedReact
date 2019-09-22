import Items from '../components/Items';

const Home = ({ query, ...props }) => (
    <div>
        <Items page={parseFloat(query.page) || 1} />
    </div>
);


export default Home;