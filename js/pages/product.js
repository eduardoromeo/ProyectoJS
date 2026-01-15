import { productsSeed } from "../data/product.js";

export function renderProductsPage(root){
    const rows = productsSeed.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.Video}</td>
            <td>${p.Fotografia}</td>
            <td>${p.Mosaico}</td>
            <td>$${p.Precio}</td>
            <td>${p.Disponible ? 'Sí' : 'No'}</td>
        </tr>
    `).join('');

    root.innerHTML = `
        <h1>Productos</h1>
        <table class="products-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Video</th>
                    <th>Fotografía</th>
                    <th>Mosaico</th>
                    <th>Precio</th>
                    <th>Disponible</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `
}