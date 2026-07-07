using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgroTech.Data;
using AgroTech.Models;

namespace AgroTech.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LancamentosController : ControllerBase
{
    private readonly AgroTechContext _context;

    public LancamentosController(AgroTechContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lancamento>>> GetLancamentos()
    {
        return await _context.Lancamentos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Lancamento>> GetLancamento(int id)
    {
        var lancamento = await _context.Lancamentos.FindAsync(id);

        if (lancamento == null)
            return NotFound();

        return lancamento;
    }

    [HttpPost]
    public async Task<ActionResult<Lancamento>> PostLancamento(Lancamento lancamento)
    {
        _context.Lancamentos.Add(lancamento);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLancamento), new { id = lancamento.Id }, lancamento);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutLancamento(int id, Lancamento lancamento)
    {
        if (id != lancamento.Id)
            return BadRequest();

        _context.Entry(lancamento).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLancamento(int id)
    {
        var lancamento = await _context.Lancamentos.FindAsync(id);

        if (lancamento == null)
            return NotFound();

        _context.Lancamentos.Remove(lancamento);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
