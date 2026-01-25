import {
    getTopSold,
    getTotalProducts,
    getTotalSales,
    getBestSeller,
} from "../services/products.services.js";

export function renderDashboardPage(root){
    const totalProducts = getTotalProducts();
    const totalSales = getTotalSales()
    const bestSeller = getBestSeller()
    const top = getTopSold(5)


    root.innerHTML = `
        <h1 style="color: #333; margin-bottom: 20px;">📊 Dashboard</h1>
        <div style="display:grid; grid-template-columns: repeat(3,1fr);gap: 12px;margin-bottom: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                <div style="opacity: .8; font-size: 13px; margin-bottom: 8px;">📦 Total Productos</div>
                <div style="font-size: 28px; font-weight: bold;">${totalProducts}</div>
            </div>
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);">
                <div style="opacity: .8; font-size: 13px; margin-bottom: 8px;">🎯 Total Contratos</div>
                <div style="font-size: 28px; font-weight: bold;">${totalSales}</div>
            </div>
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);">
                <div style="opacity: .8; font-size: 13px; margin-bottom: 8px;">⭐ Más Vendido</div>
                <div style="font-size: 18px; font-weight: bold;">${bestSeller ? bestSeller.name : 'Sin datos'}</div>
                <div style="font-size: 13px; opacity: .85; margin-bottom: 6px;">${bestSeller ? bestSeller.category : ''}</div>
                <div style="font-size: 14px; opacity: .9;">${bestSeller ? `${bestSeller.sold ?? 0} contratos` : ''}</div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
            <div style="border: 1px solid #e0e0e0; padding: 16px; border-radius: 10px; background: #fafafa; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 12px 0; color: #333; border-bottom: 3px solid #667eea; padding-bottom: 8px;">🏆 Top 5 Más Vendidos</h3>
                <div id="topList" style="font-size: 14px;"></div>
            </div>
            <div style="border: 1px solid #e0e0e0; padding: 16px; border-radius: 10px; background: #fafafa; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h3 style="margin: 0 0 12px 0; color: #333; border-bottom: 3px solid #667eea; padding-bottom: 8px;">📈 Gráfico Ventas</h3>
                <canvas id="salesChart" width="420" height="260" style="width: 100%; max-width: 520px;"></canvas>
            </div>
        </div>
    `;

    // Actualizar Top List
    const topList = root.querySelector("#topList");
    if (!top || top.length === 0) {
        topList.innerHTML = `<p style="color: #999; text-align: center; padding: 20px;">No hay datos de ventas todavía. Ve a productos y agrega ventas.</p>`
    } else {
        topList.innerHTML = `
            <ol style="margin: 0; padding-left: 20px; list-style: none; counter-reset: item;">
            ${
                top.map(
                    (p, i) => `
                    <li style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; counter-increment: item;">
                        <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; font-weight: bold; margin-right: 12px; font-size: 12px;">${i + 1}</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: #333;">${p.name}</div>
                            <div style="font-size: 12px; color: #999;">${p.category}</div>
                        </div>
                        <div style="font-weight: bold; color: #667eea; font-size: 16px;">${p.sold ?? 0}</div>
                    </li>`
                ).join("")
            }
            </ol>
        `
    }

    // Dibujar gráfico
    drawBarChart(root.querySelector("#salesChart"), top)
}

function drawBarChart(canvas, top) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!top || top.length === 0) {
        ctx.font = "14px Arial";
        ctx.fillStyle = "#999";
        ctx.fillText("Sin datos para gráfico", 10, 30);
        return;
    }

    const padding = 50;
    const chartW = canvas.width - padding * 2;
    const chartH = canvas.height - padding * 2;
    const values = top.map(p => p.sold ?? 0);
    const max = Math.max(...values, 1);

    // Colores para las barras
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe',
        '#43e97b', '#fa709a', '#fee140', '#30cfd0', '#330867'
    ];

    // Dibujar ejes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartH);
    ctx.lineTo(padding + chartW, padding + chartH);
    ctx.stroke();

    // Dibujar barras
    const barGap = 10;
    const barW = (chartW - barGap * (top.length - 1)) / top.length;

    top.forEach((p, i) => {
        const v = p.sold ?? 0;
        const barH = (v / max) * (chartH - 60);
        const x = padding + i * (barW + barGap);
        const y = padding + chartH - barH;

        // Dibujar barra con color
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(x, y, barW, barH);

        // Borde de la barra
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, barW, barH);

        // Valor en la parte superior
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(String(v), x + barW / 2, y - 8);

        // Nombre del producto
        ctx.fillStyle = '#333';
        ctx.font = 'bold 11px Arial';
        const name = (p.name || '').slice(0, 12);
        ctx.fillText(name, x + barW / 2, padding + chartH + 18);

        // Categoría del producto
        ctx.fillStyle = '#666';
        ctx.font = '9px Arial';
        const category = (p.category || '').slice(0, 12);
        ctx.fillText(category, x + barW / 2, padding + chartH + 32);
    });
}