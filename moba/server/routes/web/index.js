module.exports = app => {
    const router = require('express').Router()
    const Category = require('../../models/Category')
    const Article = require('../../models/Article')
    const Hero = require('../../models/Hero')
    //导入新闻数据
    router.get('/news/init', async (req, res) => {
        //先把新闻分类找出
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        // 再找到新闻分类下的子分类（新闻、公告、活动、赛事）,lean()方法是转成json
        const cates = await Category.find().where({
            parent: parent
        }).lean()
        const arr = ["王者荣耀祝各位召唤师春节快乐！", "《王者荣耀》获App store推荐，带你领略五岳东方之美！", "新皮肤爆料丨AI意识觉醒，机器少女妲己绚丽登场！", "五城战队团年饭，队友线下团聚回顾", "新皮肤爆料｜掌控万物，武则天化身宇宙女王！", "【已修复】关于部分召唤师点券充值未到账、点券到账延迟等问题说明", "“想玩英雄”三个都一样？违规，警告封号！", "2月4日全服不停机更新公告", "2月1日全服不停机更新公告", "净化游戏环境声明及处罚公告", "元宵福利到 峡谷好热闹！", "妲己新皮肤即将上架 全新好礼不容错过！", "除夕，年兽宝藏登录即领，抢红包抽内测皮肤！", "贺鼠年新春 领多重好礼！", "金鼠送礼 峡谷新春福利来袭", "中国电竞小伙逐梦记", "2019年赛事数据盘点，峡谷最强选手全知道！", "2020KPL春季赛大名单公示", "假期狂欢季开启，高校区域联赛战队携手虎牙人气主播开战啦！", "高校自制定格动画：说出来你可能不信，我们的“作业”打起来了！"]
        const newsTitle = arr.map(title => {
            // 把子分类复制一份，再打乱，随机选取2个
            const randomCats = cates.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        //手动向数据库插入数据，只执行一次，然后注释掉就行
        // await Article.insertMany(newsTitle)
        res.send(newsTitle)
    })

    // 新闻列表分类
    router.get('/news/list', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cates = await Category.aggregate([
            //过滤数据
            { $match: { parent: parent._id } },

            {
                $lookup:
                {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields:
                {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])

        //手动添加热门项
        const subCats = cates.map(v => v._id)
        cates.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })

        cates.map(item => {
            item.newsList.map(v => {
                v.categoryName = (item.name === '热门')
                 ? v.categories[1].name : item.name
                return v
            })
        })
        res.send(cates)
    })

    // 英雄数据列表
    router.get('/hero/list',async (req,res)=>{
        const parent = await Category.findOne({
            name:'英雄分类'
        })
        const data = await Category.aggregate([
            //过滤数据
            { $match: { parent: parent._id } },

            {
                $lookup:
                {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroList'
                }
            }
        ])
        const subCats = data.map(v => v._id)
        data.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(10).lean()
        })
        res.send(data)
    })

    //文章详情
    router.get('/article/:id',async(req,res)=>{
        const data = await Article.findById(req.params.id).lean()
        //文章详情下面的相关推荐
        data.related = await Article.find().where({
            categories:{$in:data.categories}
        }).limit(2)
        res.send(data)
    })

    // 英雄详情
    router.get('/hero/:id',async(req,res)=>{
        const data = await Hero.findById(req.params.id)
        .populate('categories items1 items2 partners.hero restraint.hero berestrained.hero').lean()
        res.send(data)
    })
    app.use('/web/api', router)
}



