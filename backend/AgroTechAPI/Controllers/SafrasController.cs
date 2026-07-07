using AgroTech.Data;
using AgroTech.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgroTech.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SafrasController : ControllerBase
{
    private readonly AgroTechContext _context;

    public SafrasController(AgroTechContext context)
    {
        _context = context;
    }

    // GET: api/Safras
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Safra>>> GetSafras()
    {
        return await _context.Safras.ToListAsync();
    }

    // GET: api/Safras/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Safra>> GetSafra(int id)
    {
        var safra = await _context.Safras.FindAsync(id);

        if (safra == null)
            return NotFound();

        return safra;
    }

    // POST: api/Safras
    [HttpPost]
    public async Task<ActionResult<Safra>> PostSafra(Safra safra)
    {
        _context.Safras.Add(safra);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetSafra),
            new { id = safra.Id },
            safra
        );
    }

    // PUT: api/Safras/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSafra(int id, Safra safra)
    {
        if (id != safra.Id)
            return BadRequest();

        _context.Entry(safra).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SafraExists(id))
                return NotFound();

            throw;
        }

        return NoContent();
    }

    // DELETE: api/Safras/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSafra(int id)
    {
        var safra = await _context.Safras.FindAsync(id);

        if (safra == null)
            return NotFound();

        _context.Safras.Remove(safra);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SafraExists(int id)
    {
        return _context.Safras.Any(e => e.Id == id);
    }
}
