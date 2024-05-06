public class FormaPagamento {
    private int id;
    private String descricao;
 
    public FormaPagamento() {
        id = 0;
        descricao = new String();
    }
 
    public FormaPagamento(int id, String descricao) {
       this.id = id;
       this.descricao = descricao;
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
}
