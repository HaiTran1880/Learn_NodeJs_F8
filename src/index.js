const express = require('express')
const path = require('path');
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const app = express()
const port = 3000
const bp = require('body-parser')
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middleware/SortMiddleware')
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
      let sortType = field === sort.column ? sort.type : 'default'
      console.log(sort.column, '=======', sort.type);
      const icons = {
        default: 'oi oi-elevator',
        desc: 'oi oi-sort-descending',
        asc: 'oi oi-sort-ascending'
      }
      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }
      const icon = icons[sort.type]
      const type = types[sort.type]

      return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "resources/views"))
app.use(morgan('combined'))
//Custom Middleware
app.use(SortMiddleware)
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const routes = require('./routes')
const db = require('./config/db')


//Connect to DB
db.connect()


routes(app);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})