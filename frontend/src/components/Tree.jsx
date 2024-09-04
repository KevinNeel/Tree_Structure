import TreeNode from "./TreeNode";

const Tree = ({ data }) => {
    return (
        <div className='mainNode'>
            {data.map((node) => (
                <TreeNode key={node._id} node={node} />
            ))}
        </div>
    );
};

export default Tree