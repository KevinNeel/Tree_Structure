//Model
import Tree from '../model/Tree.js';

//Functions
function nestedTrees(trees, parentId = null) {
    const treeList = [];

    let tree_;

    if (parentId == null) {
        tree_ = trees.filter(treeEle => treeEle.parentId == null);
    } else {
        tree_ = trees.filter(treeEle => String(treeEle.parentId) == String(parentId))
    }

    for (let t of tree_) {
        treeList.push({
            _id: t._id,
            name: t.name,
            childreen: nestedTrees(trees, t._id)
        })
    }

    return treeList;

}

/* --------------------------------------------------------- */

export const getTree = async (req, res) => {
    try {
        const trees = await Tree.find();

        if (trees.length == 0) {
            // For the simplicity purpose only
            const tree = new Tree({name: "Main Tree"})
            const treeData = await tree.save()
            return res.status(200).json({ message: "Trees Fetched Successfully!", data: nestedTree })

            //This message will be shown instead of the above code
            // return res.status(404).json({ message: "Trees Not Found!", data: [] });
        }

        console.log(trees);
        const nestedTree = await nestedTrees(trees);

        return res.status(200).json({ message: "Trees Fetched Successfully!", data: nestedTree })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' })
    }
}

export const createTree = async (req, res) => {
    try {

        const { name, parentId } = req.body;

        var treeObj = {
            name
        }

        if (parentId) {
            if (name == parentId) return res.stauts(409).json({ message: "Parent Cannot be same as Child" });
            treeObj.parentId = parentId
        }

        const tree = new Tree(treeObj)
        const treeData = await tree.save()

        return res.status(200).json({
            message: 'Tree Created',
            data: treeData
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' })
    }
}



