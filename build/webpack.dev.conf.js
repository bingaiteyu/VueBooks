'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const superagent = require('superagent')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
	

	

  // these devServer options should be customized in /config/index.js
  devServer: {
		before(app){
				app.get('/api/bookrecom',function(req,res){
					superagent.get('http://novel.juhe.im/recommend/53115e30173bfacb4904897e')
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				app.get('/api/free',function(req,res){
					superagent.get('https://novel.juhe.im/rank/54d42d92321052167dfb75e3')
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				app.get('/api/books',function(req,res){
					let id = req.query.id
					superagent.get(`http://novel.juhe.im/book-info/${id}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				app.get('/api/recommend',function(req,res){
					let id = req.query.id
					superagent.get(`http://novel.juhe.im/recommend/${id}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				app.get('/api/comment',function(req,res){
					console.log(req.query)
					let books = req.query.book
					superagent.get(`https://novel.juhe.im/book/discussions?book=${books}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				
				//获取书籍源
				app.get('/api/bookview',function(req,res){
					console.log('书籍源',req.query)
					let bookid = req.query.id
					superagent.get(`http://novel.juhe.im/book-sources?view=summary&book=${bookid}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//获取章节信息
				app.get('/api/chapter',function(req,res){
					let bookid = req.query.bookid
					superagent.get(`http://novel.juhe.im/book-chapters/${bookid}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//章节的详细信息
				app.get('/api/chapcomment',function(req,res){
					console.log(res.query)
					let url = req.query.url
					superagent.get(`http://novel.juhe.im/chapters/${url}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//搜索内容
				app.get('/api/search',function(req,res){
					superagent.get("https://novel.juhe.im/search")
					.query(req.query)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//获取父分类及书籍数量
				app.get('/api/classify',function(req,res){
					superagent.get("http://novel.juhe.im/categories")
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//获取子分类
				app.get('/api/classifys',function(req,res){
					superagent.get("http://novel.juhe.im/sub-categories")
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//获取分类详情
				app.get('/api/datail',function(req,res){
					superagent.get("http://novel.juhe.im/category-info?")
					.query(req.query)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//排行榜分类
				app.get('/api/ranking',function(req,res){
					superagent.get("http://novel.juhe.im/rank-category")
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				}),
				//排行榜详情数据
				app.get('/api/rankingitem',function(req,res){
					console.log(req.query)
					let ids = req.query.id
					superagent.get(`http://novel.juhe.im/rank/${ids}`)
					.end((err,data)=>{
						if(err){
							console.log(err)
						}
						res.json(data)
					})
				})
				
		},
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
