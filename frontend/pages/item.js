import SingleItem from '../components/SingleItem';

const Item = ({ query, ...props }) => (
    <div>
        <SingleItem id={query.id} />
    </div>
);

export default Item;