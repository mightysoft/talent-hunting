const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No doccument found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    const doc = query;
    if (!doc) {
      return next(new AppError('No Document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {

    const doc = await Model.find().sort({ createdAt: -1 });

    // SEND Response res
    res.status(200).json({
      status: 'success1',
      results: doc.length,
      data: doc,
    });
  });
