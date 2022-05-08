const mongoose = require("mongoose");
const fs = require("fs");
const path = require('path')
const {File} = require("../model/file");

module.exports = {
    createFile: async function (req, res) {

        try {
            // const newTour = new Tour({})
            // newTour.save()        
            const file = await File.create({
                id: req.body.id,
                name: req.file.originalname,
                path: req.file.path,
                _parentFolder: req.body.folderId,
                createdDate: new Date()
            });
            res.status(201).json({
              status: 'success',
              data: {
                file
              }
            });
          } catch (err) {
            res.status(400).json({
              status: 'fail',
              message: err
            });
          }
    },

    getAllFile: async function (req, res) {
        console.log(req.params.folderId)
        try {
            const file = await File.find({_parentFolder: req.params.folderId});
        
            res.status(200).json({
              status: 'success',
              data: {
                file
              }
            });
          } catch (err) {
            res.status(404).json({
              status: 'fail',
              message: err
            });
          }
    },

    // delete a course
    deleteFile: function (req, res) {
        const id = req.params.fileId;
        File.findOneAndDelete({id})
            .exec()
            .then(() =>
                res.status(204).json({
                    success: true
                })
            )
            .catch(err =>
                res.status(500).json({
                    success: false
                })
            );
    }
}