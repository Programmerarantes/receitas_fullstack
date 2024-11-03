import express from 'express'
import cors from 'cors'
import * as RecipeAPI from './recipe-api'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()

const prismaClient = new PrismaClient()

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

app.post("/api/recipes/favourite", async (req, res) => {
    const {recipeId }= req.body;
    try {
        const favouriteRecipe = await prismaClient.favouriteRecipes.create({
            data: { recipeId: recipeId }
        });
        res.status(201).json(favouriteRecipe);
    } catch (error) {
        console.error("Erro ao adicionar receita favorita:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/api/recipes/favourite", async (req, res) => {
    const recipes = await prismaClient.favouriteRecipes.findMany()
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString())
    await RecipeAPI.getFavouriteRecipesByIDs(recipeIds)
    .then((favourites) => {return res.json(favourites)})
    .catch(error => {console.log(error)
    res.status(500).json( {error: "Something went wrong"})})
})

app.delete("/api/recipes/favourite", (req, res) => {
    const recipeId = req.body.recipeId;

    prismaClient.favouriteRecipes.delete({
        where: { recipeId: recipeId }
    })
    .then(() => res.status(204).send()) 
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Oops, something went wrong" });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})