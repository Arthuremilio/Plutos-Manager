public class Produto {
    private int id;
    private String descricao;
    private float custo;
    private float preco;
    private int categoria;
    private int usuario;
 
    public Produto() {
        id = 0;
        descricao = new String();
        custo = 0;
        preco = 0;
        usuario = 0;
        categoria = 0;
    }
 
    public Produto(int id, String descricao, float custo, float preco, int categoria, int usuario) {
       this.id = id;
       this.descricao = descricao;
       this.custo = custo;
       this.preco = preco;
       this.usuario = usuario;
       this.categoria = categoria;
    }
 
    public int getId() {
       return this.id;
    }
 
    public void setId(int id) {
       this.id = id;
    }
 
    public String getDescricao() {
       return this.descricao;
    }
 
    public void setDescricao(String descricao) {
       this.descricao = descricao;
    }
 
    public float getCusto() {
       return this.custo;
    }
 
    public void setCusto(float custo) {
       this.custo = custo;
    }
 
    public float getPreco() {
       return this.preco;
    }
 
    public void setPreco(float preco) {
       this.preco = preco;
    }
 
    public int getCategoria() {
       return this.categoria;
    }
 
    public void setCategoria(int categoria) {
       this.categoria = categoria;
    }
 
    public int getUsuario() {
       return this.usuario;
    }
 
    public void setUsuario(int usuario) {
       this.usuario = usuario;
    }
}
