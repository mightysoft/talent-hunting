const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeature');

exports.deleteOne = Model => catchAsync(async(req, res, next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id);
    if(!doc){
        return next(new AppError('No document found with that id',404));
    }
    res.status(204).json({
        status:'success',
        data:null
    });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!doc) {
        return next(new AppError('No doccument found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    const doc = query;
    console.log(doc);
    if(!doc){
        return next(new AppError('No Document found with that id',404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.getAll = Model => catchAsync(async (req, res, next) => {
    //To Allow for nasted Get Post review on the job post 
    let filter = {}
    if(req.params.id) filter = { post: req.params.id};

    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .limiting()
        .sorting()
        .pagination();

    const doc = await features.query;
    
    // SEND Response res 
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
});