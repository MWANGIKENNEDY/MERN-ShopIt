class APIFeatures{
    constructor(query,querystring){
        this.query = query;
        this.querystring = querystring;
    }

    //search feature

    search(){
        //if keyword does not exist return empty object

        //Working API

        //api/v1/shopit/products?keyword=laptop
        const keyword = this.querystring.keyword ? {
            name:{
                $regex:this.querystring.keyword,
                $options: 'i'
            }
        } :{};
        this.query = this.query.find({...keyword});
        //return an instance of the context object:
        return this;
    }

    //filter according to category and price
    filter(){
        //api/v1/shopit/products?keyword=laptop&category=Accesories
        const queryCopy = {...this.querystring};
        const removeFields = ['keyword','limit','page'];
        //removing keywords from the incoming req query object
        removeFields.forEach(el => delete queryCopy[el]);
        //advanced filter for price / ratings / integer values

        //Working API

        //api/v1/shopit/products?keyword=apple&category=Food&price[gte]=1&price[lte]=200

        let queryStr = JSON.stringify(queryCopy);

        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //Pagination filter

    pagination(resultsPerPage){
        //get the current page
    
        const currentPage=Number(this.querystring.page) || 1;
        const skip = resultsPerPage*(currentPage-1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }



}

module.exports = APIFeatures;