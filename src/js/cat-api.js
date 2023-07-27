export default function fetchBreeds() {
     fetch('https://api.thecatapi.com/v1/breeds')
       .then(r => r.json()).then(console.log);
}