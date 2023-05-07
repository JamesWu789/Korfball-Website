const Work = require('../models/work');

exports.postAddWork = (req, res, next) => {
    console.log("main:post");
    const worker = req.body.worker;
    const workItem = req.body.workItem;
    const specification = req.body.specification;
    const quantity = req.body.quantity;
    const location = req.body.location;
    const date = req.body.date;
    const work = new Work(
        worker,
        workItem,
        specification,
        quantity,
        location,
        date,
        null);
    work
        .save()
        .then(() => {
            console.log('Created Work');
            console.log(req.body);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getWorks = (req, res, next) => {
    console.log("product:get");
    const edit = req.query.edit;
    Work.fetchAll()
    .then(works => {
        if (edit === 'true') {
            res.render('admin/work', {
                works: works
            })
        } else {
            res.render('user/work_list', {
                works: works
            })
        }
    }).catch(err => console.log(err));
};


exports.getEditWork = (req, res, next) => {
    const workID = req.params.workId;    // 就是網址後方的 /:內容
    Work.findById(workID)            // mongodb取的ID  (work.ejs的works._id)
        .then(work => {
            res.render('admin/edit-work', {
                works: work
            });
        })
        .catch(err => console.log(err));
};


exports.postEditWork = (req, res, next) => {
    console.log("product:post:edit");
    const workerUpdate = req.body.worker;
    const workItemUpdate = req.body.workItem;
    const specificationUpdate = req.body.specification;
    const quantityUpdate = req.body.quantity;
    const locationUpdate = req.body.location;
    const dateUpdate = req.body.date;
    const workId = req.body.workId;

    const work = new Work(
        workerUpdate,
        workItemUpdate,
        specificationUpdate,
        quantityUpdate,
        locationUpdate,
        dateUpdate,
        workId
    );
    work
        .save()
        .then(result => {
            console.log('Update Work');
            res.redirect('/admin/work?edit=true');      // 前面需要加 '/'開頭代表絕對路徑
        })
        .catch(err => console.log(err));
};

exports.getDeleteWork = (req, res, next) => {
    const workID = req.params.workId;
    Work.deleteById(workID)
        .then(() => {
            console.log('Delete Work');
            res.redirect('/admin/work?edit=true');
        }).catch(err => console.log(err));
};
