package com.kltech.product_service.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product extends Base {

  @Column(name = "name")
  private String name;

  @Column(name = "slug")
  private String slug;

  @Column(name = "description")
  private String description;

  @Column(name = "thumbnail")
  private String thumbnail;

  @Column(name = "price")
  private double price;

  @Column(name = "discount")
  private double discount;

  @Column(name = "status")
  private String status;

  @Column(name = "colors")
  private List<String> colors;

  @Column(name = "featured")
  private boolean featured;

  @OneToMany(mappedBy = "product")
  private List<Review> reviews;

  @ManyToOne
  @JoinColumn(name = "category_id")
  private Category category;
}
