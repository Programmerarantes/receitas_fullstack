import dotenv from 'dotenv'

dotenv.config()

const apiKey = process.env.API_KEY

export const searchRecipes = async (searchTerm: string , page: number) => {
    if(!apiKey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch")

    const queryParams = {
        apiKey,
        query: searchTerm,
        number: "10",
        offset: isNaN(page) ? "0" : (page * 10).toString()
    }

    url.search = new URLSearchParams(queryParams).toString()

    try {
        console.log("URL", url.toString())
        const searchResponse = await fetch(url)
        const resultJson = await searchResponse.json()
        console.log(resultJson)
        return resultJson
        
    } catch (error) {
        console.log(error)
        
    }
}

