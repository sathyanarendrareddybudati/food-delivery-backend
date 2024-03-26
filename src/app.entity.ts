import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public type: string;

    @Column({ type: 'text' })
    public description: string;

}

@Entity()
export class Pricing {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Organization)
    @JoinColumn({ name: "organization_id" })
    public organization: Organization;

    @ManyToOne(() => Item)
    @JoinColumn({ name: "item_id" })
    public item: Item;

    @Column()
    public zone: string;

    @Column()
    public base_distance_in_km: number;

    @Column('decimal', { precision: 5, scale: 2 })
    public km_price: number;

    @Column('integer')
    public fix_price: number;
}
