import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipe-api'
import dotenv from 'dotenv'
import { getRecipeSummary } from './recipe-api';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

/*app.get("/", (req, res) => {
    res.send("Hello World")
})*/

app.get("/api/recipes/search", async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm as string
        const page = parseInt(req.query.page as string)
        await RecipeAPI.searchRecipes(searchTerm, page).then((results) => {
            return res.json(results)
        })
    } catch (error) {
        console.error("Erro ao buscar receitas:", error)
    }
})

app.get("/api/recipes/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId
    await RecipeAPI.getRecipeSummary(recipeId).then((results) => {
        return res.json(results)
    })

})

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})