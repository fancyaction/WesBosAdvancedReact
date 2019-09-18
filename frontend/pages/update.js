import UpdateItem from '../components/UpdateItem';


const Update = ({ query, ...props }) => (
    <div>
        <UpdateItem id={query.id} />
    </div>
);

export default Update;
